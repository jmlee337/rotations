Meteor.subscribe("items");
Meteor.subscribe("preferences");

Template.itemsView.helpers({
  showAll: function() {
    return Session.get("showAll");
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

Template.currentItems.helpers({
  items: function() {
    var preferences = Preferences.findOne();

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