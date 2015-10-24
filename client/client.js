Meteor.subscribe("items");
Meteor.subscribe("preferences");

Template.allItems.helpers({
  items: function() {
    return Items.find({}, {sort: [["_id", "asc"]]});
  }
});