const { remove } = require('../data-management/data.js');

test('Remove item from local storage',()=>{
    localStorage.setItem("test", "this should be deleted");
    remove("test");
    let removed = localStorage.getItem("test");
    expect(removed).toBe(null);
});
