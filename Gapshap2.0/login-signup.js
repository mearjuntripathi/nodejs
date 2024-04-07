const login = (req, res) => {
    console.log(req.body);
    res.end();
}

const signup = (req,res) => {
    console.log(req.body);
    res.end();
}

module.exports = {login,signup};