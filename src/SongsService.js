const {Pool} = require('pg');

class SongsService {
	constructor() {
		this.pool = new Pool();
	}

	async getSongsInPlaylistById({playlistId}) {
		const query1 = {
			text: `SELECT playlists.* FROM playlists
		  WHERE playlists.id = $1
		  GROUP by playlists.id`,
			values: [playlistId],
		};

		const query3 = {
			text: `SELECT playlist_songs.*, songs.title, songs.performer
		FROM playlist_songs
		LEFT JOIN songs ON songs.id = playlist_songs.song_id
		WHERE playlist_songs.playlist_id = $1`,
			values: [playlistId],
		};

		const resultA = await this.pool.query(query1);

		const resultD = await this.pool.query(query3);

		const resultD1 = resultD.rows.map(n => ({
			id: n.song_id,
			title: n.title,
			performer: n.performer,
		}));
		const resultC = resultA.rows.map(n => ({
			id: n.id,
			name: n.name,
			songs: resultD1,
		}))[0];
		const resultE = {playlist: resultC};
		return resultE;
	}
}
module.exports = SongsService;
