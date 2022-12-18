export const get = (req, res) => res.render('lobby', { roomId: req.params.roomId })

export const post = (req, res) => {
    res.cookie('username', req.body.username, { maxAge: 20 * 60 * 1000, httpOnly: true })
    res.cookie('mic', req.body.mic, { maxAge: 3 * 1000, httpOnly: true })
    res.cookie('cam', req.body.cam, { maxAge: 3 * 1000, httpOnly: true })
    res.cookie('roomId', req.params.roomId, { maxAge: 20 * 60 * 1000, httpOnly: true })
    res.redirect(`/room/${req.params.roomId}`)
}