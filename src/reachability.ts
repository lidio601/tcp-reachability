/**
 * @author "Fabio Cigliano"
 * @created 3/11/18
 */

import { default as _ } from 'lodash'
import Promise from 'bluebird'
import { default as net } from 'net'
import { default as URL } from 'url'

const log = console.log;

/**
 * Test TCP connection to a remote host
 * @link https://www.npmjs.com/package/test-tcp
 * @link https://nodejs.org/api/net.html#net_class_net_socket
 * @link https://nodejs.org/api/url.html#url_class_url
 * @param {String} url
 * @param {number} ttl
 * @param {boolean} debug
 */
export default function isReachable(url : string, ttl ?: false|number, debug ?: boolean) : Promise<boolean> {
  return new Promise((resolve, reject) => {
      try {
        ttl
        let dataReceived

        if (!_.startsWith(url, 'http')) {
            url = 'http://' + url
        }
        const parsed = URL.parse(url)

        debug && log('connecting to', parsed)
        const hostname = _.get(parsed, 'hostname')
        var socket = net.createConnection({
            host: hostname,
            port: _.toInteger(parsed.port) || 80
        }, function() {
            debug && log(`connected to server ${hostname}`)
            dataReceived = true
            socket.end()
        })

        socket.setTimeout(ttl || 10000, () => {
            debug && log(`socket timeout for host ${hostname}`)
            dataReceived = false
            socket.destroy()
        })

        socket.on('error', err => {
            debug && log(`connection error for host ${hostname}`, err)
            if (dataReceived !== true) {
              dataReceived = false;
            }
        })

        socket.on('close', () => {
            debug && log(`connection closed for host ${hostname}`, {dataReceived})
            resolve(dataReceived)
        })

        socket.on('data', data => {
            debug && log(`data received from host ${hostname}`, data)
            dataReceived = true
            socket.end()
        })
      } catch(err) {
          reject(err)
      }
  })
}
