
module.exports = {
    echo: function(args, request) {
        console.log('hello');
        request('hello world')
    }
}