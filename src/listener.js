class Listener {
	constructor(songsService, mailSender) {
		this._songsService = songsService;
		this._mailSender = mailSender;

		this.listen = this.listen.bind(this);
	}

	async listen(message) {
		try {
			const {targetEmail, playlistId} = JSON.parse(message.content.toString());

			const playlist = await this._songsService.getSongsInPlaylistById({playlistId});

			await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
		} catch (error) {
			console.error(error);
		}
	}
}
module.exports = Listener;
