/**
 * userId: id of this item's owner
 * body: the text of the item
 * title: the title of the item
 */
Items = new Mongo.Collection("items");

/**
 * userId: id of these preferences' owner
 * dayLength: the length of one 'day' in hours
 * weekLength: the number of 'days' in a 'week'
 */
Preferences = new Mongo.Collection("preferences");