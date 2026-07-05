"use strict";

var utils = require("../utils");
var GenericWorker = require("./GenericWorker");
var DataWorker = require("./DataWorker");

/**
 * A DataWorker for data already available synchronously: chunks are emitted
 * in a blocking loop on resume() instead of being scheduled on the event
 * loop. Since every other worker of a chain reacts synchronously to the
 * chunks it receives, a chain fed by SyncDataWorkers completes (emits "end")
 * before resume() returns.
 * @constructor
 * @param {String|Uint8Array|Array|Buffer} data the data to split.
 */
function SyncDataWorker(data) {
    GenericWorker.call(this, "SyncDataWorker");
    this.dataIsReady = true;
    this.index = 0;
    this.data = data;
    this.max = data && data.length || 0;
    this.type = utils.getTypeOf(data);
    this._tickScheduled = false;
}

utils.inherits(SyncDataWorker, DataWorker);

/**
 * @see GenericWorker.resume
 */
SyncDataWorker.prototype.resume = function () {
    if (!GenericWorker.prototype.resume.call(this)) {
        return false;
    }
    this._tickAndRepeat();
    return true;
};

/**
 * Emit every remaining chunk synchronously.
 */
SyncDataWorker.prototype._tickAndRepeat = function () {
    while (!this.isPaused && !this.isFinished) {
        this._tick();
    }
};

module.exports = SyncDataWorker;
