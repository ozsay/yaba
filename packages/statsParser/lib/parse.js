import Stats from './classes/Stats';

export default function parse(stats) {
    return new Promise((resolve, reject) => {
        try {
            const start = Date.now();

            console.log(stats);

            const parsedStats = new Stats(stats);

            parsedStats.setModules(stats.modules);
            parsedStats.setChunks(stats.chunks);
            parsedStats.setAssets(stats.assets);
            parsedStats.setPackages(stats.packages);
            parsedStats.setLoaders(stats.loaders);

            parsedStats.createRelations();

            parsedStats.doneInit();

            console.log(parsedStats);
            console.log(`finished parsing stats after ${Date.now() - start}ms`);
            resolve(parsedStats);
        } catch (e) {
            reject(e);
        }
    });
}
