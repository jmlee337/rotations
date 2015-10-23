Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  insertItem: function(body) {
    check(body, String);
    var userId = getUserId();
    return Items.insert({userId: userId, body: body});
  },

  insertItemWithTitle: function(body, title) {
    check(body, String);
    check(title, String);
    var userId = getUserId();
    return Items.insert({userId: userId, body: body, title: title});
  },

  editItem: function(id, body) {
    check(id, String);
    check(body, String);
    var userId = getUserId();
    return Items.update({_id: id, userId: userId}, {$set: {body: body}});
  },

  editItemTitle: function(id, title) {
    check(id, String);
    check(title, String);
    var userId = getUserId();
    return Items.update({_id: id, userId: userId}, {$set: {title: title}});
  },

  editItemWithTitle: function(id, body, title) {
    check(id, String);
    check(body, String);
    check(title, String);
    var userId = getUserId();
    return Items.update({_id: id, userId: userId}, {$set: {body: body, title: title}});
  },

  removeItem: function(id) {
    check(id, String);
    var userId = getUserId();
    return Items.remove({_id: id, userId: userId});
  },

  initializePreferences: function() {
    var userId = getUserId();
    return Preferences.insert({
      userId: userId,
      dayLength: DEFAULT_DAY_LENGTH,
      weekLength: DEFAULT_WEEK_LENGTH
    });
  },

  setDayLength: function(dayLength) {
    check(dayLength, Number);
    return Preferences.update({userId: userId}, {$set: {dayLength: dayLength}});
  },

  setWeekLength: function(weekLength) {
    check(weekLength, Number);
    return Preferences.update({userId: userId}, {$set: {weekLength: weekLength}})
  }
});

getUserId = function() {
  var userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("state", "no user id available");
  }
  return userId;
};