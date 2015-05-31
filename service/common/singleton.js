var ROOT_PATH = (function () {
    function Singleton(args) {
        this.path = args;
    }

    Singleton.prototype.getPath = function () {

        return this.path;
    }

    var instance;

    var _static = {
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

module.exports.ROOT_PATH=ROOT_PATH;
