/**
   * Retrieve playlists for a category.
   * @param {string} categoryId The id of the category to retrieve playlists for.
   * @param {Object} [options] Options, being country, limit, offset.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} A promise that if successful, resolves to a paging object containing simple playlists.
   * Not returned if a callback is given.
   */
 getPlaylistsForCategory: function(categoryId, options, callback) {
  return WebApiRequest.builder(this.getAccessToken())
    .withPath('/v1/browse/categories/' + categoryId + '/playlists')
    .withQueryParameters(options)
    .build()
    .execute(HttpManager.get, callback);
},