
export const get = (req, res) => {
    if (req.cookies['username'] && req.cookies['roomId'] == req.params.roomId) {
        const obj = {
            roomId: req.params.roomId,
            username: req.cookies['username'],
            mic: req.cookies['mic'],
            cam: req.cookies['cam']
        }
        res.render('room', obj)
    }
    else {
        res.redirect(`/lobby/${req.params.roomId}`)
    }
}

export const post = (req, res) => {
    res.cookie('username', req.body.username, { maxAge: 20 * 60 * 1000, httpOnly: true })
    res.cookie('mic', req.body.mic, { maxAge: 3 * 1000, httpOnly: true })
    res.cookie('cam', req.body.cam, { maxAge: 3 * 1000, httpOnly: true })
    res.cookie('roomId', req.body.roomId, { maxAge: 20 * 60 * 1000, httpOnly: true })
    res.redirect(`/room/${req.body.roomId}`)
}