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
    return Items.find({}, {sort: [["_id", "asc"]]});
  }
});