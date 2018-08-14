export default async function (stats) {
    const res = stats.packages.reduce((acc, _package) => {
        if (!_package.name || acc[_package.name]) {
            return acc;
        }

        const samePackages = stats.packages.filter(_p => _p.name === _package.name);

        if (samePackages.length > 1) {
            acc[_package.name] = samePackages;
        }

        return acc;
    }, {});

    return Object.values(res);
}
