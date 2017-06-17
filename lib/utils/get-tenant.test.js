'use strict';

import getTenant from './get-tenant';

test('', () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJRCI6InRlc3RlIn0.j-NUJF8fbeV5fDtASOu3QZPXmoeo_tZFAHbGAwGbJe4";
    return getTenant('secret')([token, "A", 123, {"name": "B"}]).then(data => expect(data).toContain('teste'));
});
