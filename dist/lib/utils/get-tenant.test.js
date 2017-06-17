'use strict';

var _getTenant = require('./get-tenant');

var _getTenant2 = _interopRequireDefault(_getTenant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('', function () {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJRCI6InRlc3RlIn0.j-NUJF8fbeV5fDtASOu3QZPXmoeo_tZFAHbGAwGbJe4";
    return (0, _getTenant2.default)('secret')([token, "A", 123, { "name": "B" }]).then(function (data) {
        return expect(data).toContain('teste');
    });
});