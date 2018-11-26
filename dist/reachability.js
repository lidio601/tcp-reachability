"use strict";
/**
 * @author "Fabio Cigliano"
 * @created 3/11/18
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const bluebird_1 = __importDefault(require("bluebird"));
const net_1 = __importDefault(require("net"));
const url_1 = __importDefault(require("url"));
const ts_log_1 = require("ts-log");
let logger = ts_log_1.dummyLogger;
function setLogger(_logger) {
    logger = _logger;
}
exports.setLogger = setLogger;
/**
 * Test TCP connection to a remote host
 * @link https://www.npmjs.com/package/test-tcp
 * @link https://nodejs.org/api/net.html#net_class_net_socket
 * @link https://nodejs.org/api/url.html#url_class_url
 * @param {String} url
 * @param {number} ttl
 */
function isReachable(url, ttl) {
    return new bluebird_1.default((resolve, reject) => {
        try {
            let dataReceived;
            if (!lodash_1.default.startsWith(url, 'http')) {
                url = 'http://' + url;
            }
            const parsed = url_1.default.parse(url);
            logger.debug('connecting to', parsed);
            const hostname = lodash_1.default.get(parsed, 'hostname');
            var socket = net_1.default.createConnection({
                host: hostname,
                port: lodash_1.default.toInteger(parsed.port) || 80
            }, function () {
                logger.info(`connected to server ${hostname}`);
                dataReceived = true;
                socket.end();
            });
            socket.setTimeout(ttl || 10000, () => {
                logger.warn(`socket timeout for host ${hostname}`);
                dataReceived = false;
                socket.destroy();
            });
            socket.on('error', err => {
                logger.error(`connection error for host ${hostname}`, err);
                if (dataReceived !== true) {
                    dataReceived = false;
                }
            });
            socket.on('close', () => {
                logger.trace(`connection closed for host ${hostname}`, { dataReceived });
                resolve(dataReceived);
            });
            socket.on('data', data => {
                logger.trace(`data received from host ${hostname}`, data);
                dataReceived = true;
                socket.end();
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = isReachable;
//# sourceMappingURL=reachability.js.map