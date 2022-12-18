export const get = (req, res) => {
    if (req.cookies['username'] && req.cookies['roomId'] == req.params.roomId) {
        const obj = {
            roomId: req.params.roomId,
            username: req.cookies['username'],
            mic: req.cookies['mic'],
            cam: req.cookies['cam']
        }
        res.render('room', obj)
    } else
        res.redirect(`/lobby/${req.params.roomId}`)
}