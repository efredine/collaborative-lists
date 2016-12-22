/**
 * A user's vote on a movie can be a thumb's up, a thumb's down, none or undefined.
 *
 * None is used to clear out an existing up or down vote.  If the user has never voted, their vote is undefined.
 * Of course, for practical purposes, undefined and none mean the same thing, it's just that none means they voted
 * then later changed their mind.
 */
export default {
  UP: 'up',
  DOWN: 'down',
  NONE: 'none'
};