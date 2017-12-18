import Stats from './classes/Stats';

export default function parse(stats) {
    return new Promise((resolve, reject) => {
        try {
            const parsedStats = new Stats(stats);

            parsedStats.setModules(stats.modules);
            parsedStats.setChunks(stats.chunks);
            parsedStats.setAssets(stats.assets);
            parsedStats.setPackages(stats.packages);

            parsedStats.modules.forEach((module) => {
                module.setIssuer(parsedStats.modules);
                module.setReasons(parsedStats.modules);
                module.setChildren(parsedStats.modules);
                module.setChunks(parsedStats.chunks);

                if (!module.issuer) {
                    parsedStats.setMain(module);
                }
            });

            parsedStats.packages.forEach((pac) => {
                pac.setModules(parsedStats.modules);
            });

            parsedStats.chunks.forEach((chunk) => {
                chunk.setAssets(parsedStats.assets);
            });

            parsedStats.doneInit();

            console.log(stats);
            console.log(parsedStats);

            resolve(parsedStats);
        } catch (e) {
            reject(e);
        }
    });
}
