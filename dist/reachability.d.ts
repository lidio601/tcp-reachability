/**
 * @author "Fabio Cigliano"
 * @created 3/11/18
 */
import Promise from 'bluebird';
import { Logger } from 'ts-log';
export declare function setLogger(_logger: Logger): void;
/**
 * Test TCP connection to a remote host
 * @link https://www.npmjs.com/package/test-tcp
 * @link https://nodejs.org/api/net.html#net_class_net_socket
 * @link https://nodejs.org/api/url.html#url_class_url
 * @param {String} url
 * @param {number} ttl
 */
export default function isReachable(url: string, ttl?: false | number): Promise<boolean>;
