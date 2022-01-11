
export class TestClass {

    constructor() {
        this.msg = 'HELLO from DEMO class';
        console.log(this.msg);
    }

    run() {
        fetch('/api/testdata')
        .then(res => res.json())
        .then(data => console.log('/api/testdata response',data))

        fetch('/api/testfile')
        .then(res => res.json())
        .then(data => console.log('/api/testfile response',data))
    }
}