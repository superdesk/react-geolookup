const expect = require('chai').expect,
    childProcess = require('child_process'),
    path = require('path'),
    localPackage = require('../package.json');

describe('The dist build', () => {
    it('creates an importable dist module', function(done) {
        this.timeout(60000); // eslint-disable-line no-invalid-this

        const rootDir = path.resolve(__dirname, '..');

        childProcess
            .exec('npm run build:dist', {cwd: rootDir})
            .on('exit', (exitCode) => {
                expect(exitCode).to.equal(0);

                const ctor = require(path.resolve(rootDir, localPackage.main));

                expect(ctor.default).to.be.a('function');
                done();
            });
    });
});
