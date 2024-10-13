"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewScript = void 0;
var __selfType = requireType("./Untitled TypeScript");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const SIK_1 = require("SpectaclesInteractionKit/SIK");
let NewScript = class NewScript extends BaseScriptComponent {
    onAwake() {
        var i = 0;
        var delayedEvent = this.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(() => {
            if (i < this.objectsToSpawn.length) {
                this.removeAll();
                this.spawnObject(new vec3(0, 0, 20), i);
                i++;
                delayedEvent.reset(5);
                print("Delay has started");
            }
        });
        delayedEvent.reset(2);
        print("Delay has started");
        this.rightHand.onPinchDown(() => {
            this.incrementCount(i);
        });
    }
    incrementCount(idx) {
        this.shapeEvents[idx] += 1;
        if (this.shapeEvents[this.correctAnswer] == 1) {
            print("Test Succeeded, yes ADHD");
        }
        else if (this.shapeEvents[this.correctAnswer] > 1 || this.shapeEvents[this.correctAnswer] < 1) {
            print("Test Failed, no ADHD");
        }
    }
    spawnObject(position, i) {
        let instantiatePrefab = this.objectsToSpawn[i].instantiate(this.getSceneObject());
        this.spawnedObjects.push(instantiatePrefab);
        instantiatePrefab.getTransform().setWorldPosition(position);
        print(instantiatePrefab.getTransform().getWorldPosition());
    }
    removeAll() {
        for (let i = 0; i < this.spawnedObjects.length; i++) {
            let obj = this.spawnedObjects[i];
            obj.destroy();
        }
        this.spawnedObjects = [];
    }
    __initialize() {
        super.__initialize();
        this.counter = 0;
        this.handInputData = SIK_1.SIK.HandInputData;
        this.rightHand = this.handInputData.getHand("right");
        this.spawnedObjects = new Array();
        this.shapeEvents = [0, 0, 0, 0, 0, 0];
        this.correctAnswer = 5;
    }
};
exports.NewScript = NewScript;
exports.NewScript = NewScript = __decorate([
    component
], NewScript);
//# sourceMappingURL=Untitled%20TypeScript.js.map