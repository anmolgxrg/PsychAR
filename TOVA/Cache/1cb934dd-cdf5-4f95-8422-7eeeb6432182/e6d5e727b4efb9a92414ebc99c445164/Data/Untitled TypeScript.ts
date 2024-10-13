import { SIK } from "SpectaclesInteractionKit/SIK";

@component
export class NewScript extends BaseScriptComponent {

    @input
    objectsToSpawn: ObjectPrefab[];
    counter: number = 0;
    
    private handInputData = SIK.HandInputData;
    private rightHand = this.handInputData.getHand("right");
    private spawnedObjects = new Array<SceneObject>();
    private shapeEvents = [0,0,0,0,0,0];
    private correctAnswer: number = 5;
    

    onAwake() {
        var i = 0;

        var delayedEvent = this.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(() => {
            if (i < this.objectsToSpawn.length)
            {
                this.removeAll()
                this.spawnObject(new vec3(0,0,20), i);
                i++;
                delayedEvent.reset(5);
                print("Delay has started");
                
            }
        }); 
        delayedEvent.reset(2);
        print("Delay has started");
        
        this.rightHand.onPinchDown(() => { 
                    this.incrementCount(i);
                    }
                );
        
    }
    
    incrementCount(idx: number) {
        this.shapeEvents[idx] += 1;
        if (this.shapeEvents[this.correctAnswer] == 1) {
            print("Test Succeeded, yes ADHD");
            
        }
        else if (this.shapeEvents[this.correctAnswer] > 1 || this.shapeEvents[this.correctAnswer] < 1) {
            print("Test Failed, no ADHD");
        }
    }

    spawnObject(position: vec3, i: number)
    {
        let instantiatePrefab = this.objectsToSpawn[i].instantiate(this.getSceneObject());
        this.spawnedObjects.push(instantiatePrefab);
        instantiatePrefab.getTransform().setWorldPosition(position);
        print(instantiatePrefab.getTransform().getWorldPosition());
    }
    removeAll()
    {
        for (let i = 0; i < this.spawnedObjects.length; i++)
        {
            let obj = this.spawnedObjects[i];
            obj.destroy();
        }
        this.spawnedObjects = [];
    }
    
    
}