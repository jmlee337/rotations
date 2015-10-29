Meteor.subscribe("items");
Meteor.subscribe("preferences");

Accounts.onLogin(function() {
  var preferences = Preferences.findOne();
  if (!preferences) {
    Meteor.call("initializePreferences");
  }
});

Template.body.helpers({
  view: function() {
    return Session.get("view");
  }
});

Template.addView.events({
  'click .back': function() {
    Session.set("view", "itemsView");
  },

  'submit form': function(event) {
    event.preventDefault();
    var title = event.target.newTitle.value;
    var body = event.target.newBody.value;
    if (!body) {
      return;
    }

    if (title) {
      Meteor.call("insertItemWithTitle", body, title);
    } else {
      Meteor.call("insertItem", body);
    }

    Session.set("view", "itemsView");
  }
});

Template.itemsView.helpers({
  showAll: function() {
    return Session.get("showAll");
  }
});

Template.itemsView.events({
  'click .fab': function() {
    Session.set("view", "addView");
  }
});

Template.itemsSelector.helpers({
  showAll: function() {
    return Session.get("showAll");
  }
});

Template.itemsSelector.events({
  'click .current': function() {
    Session.set("showAll", false);
  },

  'click .all': function() {
    Session.set("showAll", true);
  }
});

Template.allItems.helpers({
  items: function() {
    return Items.find({}, {sort: [["_id", "asc"]]});
  }
});

Template.allItems.events({
  'click .delete': function(event) {
    deleteItem(event.currentTarget.value);
  },

  'click .edit': function(event) {
    editItem(event.currentTarget.value);
  }
});

Template.currentItems.helpers({
  items: function() {
    var preferences = Preferences.findOne();
    if (!preferences) {
      return;
    }

    var nowDiffMs = Date.now() - preferences.originMs;
    var nowDiffDays = Math.floor(nowDiffMs / 1000 / 60 / 60 / preferences.dayLength);
    var dayOfWeek = nowDiffDays % preferences.weekLength;

    var numItems = Items.find().count();
    var itemsPerDay = numItems / preferences.weekLength;
    var startIndex = Math.round(dayOfWeek * itemsPerDay);

    if (dayOfWeek < (preferences.weekLength - 1)) {
      var limit = Math.round((dayOfWeek + 1) * itemsPerDay) - startIndex;
      return Items.find({}, {sort: [["_id", "asc"]], skip: startIndex, limit: limit});
    } else {
      return Items.find({}, {sort: [["_id", "asc"]], skip: startIndex});
    }
  }
});

Template.currentItems.events({
  'click .delete': function(event) {
    deleteItem(event.currentTarget.value);
  },

  'click .edit': function(event) {
    editItem(event.currentTarget.value);
  }
});

deleteItem = function(id) {
  Meteor.call("removeItem", id);
};

editItem = function(id) {
  console.log("edit: " + id);
};