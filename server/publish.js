Meteor.publish("items", function() {
  return Items.find({userId: this.userId});
});

Meteor.publish("preferences", function() {
  return Preferences.find({userId: this.userId});
});