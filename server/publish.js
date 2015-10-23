Meteor.publish("items", function() {
  return Items.find({userId: this.userId});
});

Meteor.publish("preferenes", function() {
  return Preferences.find({userId: this.userId});
});