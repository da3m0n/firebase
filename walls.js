class Wall {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
    
    collides(obj, deltaTime) {
        if (obj instanceof Ball) {
            return obj.collides(this, deltaTime);
        }
        return null;
    } 
}