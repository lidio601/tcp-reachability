/// <reference types="bluebird" />
import Promise from 'bluebird';
/**
 * Test TCP connection to a remote host
 * @link https://www.npmjs.com/package/test-tcp
 * @link https://nodejs.org/api/net.html#net_class_net_socket
 * @link https://nodejs.org/api/url.html#url_class_url
 * @param {String} url
 * @param {number} ttl
 * @param {boolean} debug
 */
export default function isReachable(url: string, ttl?: false | number, debug?: boolean): Promise<boolean>;
