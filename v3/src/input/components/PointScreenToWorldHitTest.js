var GetTransformedPoint = require('./GetTransformedPoint');
var PointWithinGameObject = require('./PointWithinGameObject');

var PointScreenToWorldHitTest = function (tempMatrix, x, y, gameObjectArray, camera, output) 
{
    var length = gameObjectArray.length;
    var scrollX = camera.scrollX;
    var scrollY = camera.scrollY;
    var cameraW = camera.width;
    var cameraH = camera.height;

    if (!(x >= camera.x && y >= camera.y &&
        x <= camera.x + cameraW && y <= camera.y + cameraH))
    {
        return null;
    }

    var screenPoint = camera.cameraToScreen({x: x, y: y});

    output.length = 0;

    if (gameObjectArray instanceof Array)
    {
        var culled = camera.cull(gameObjectArray);
        var culledLength = culled.length;

        for (var index = 0; index < culledLength; ++index)
        {
            var object = culled[index];
            var tpoint = GetTransformedPoint(tempMatrix, object, screenPoint.x + scrollX * object.scrollFactorX, screenPoint.y + scrollY * object.scrollFactorY);

            if (PointWithinGameObject(object, tpoint.x, tpoint.y))
            {
                output.push(object);
            }
        }

        return output;
    }
    else
    {
        var tpoint = GetTransformedPoint(tempMatrix, object, screenPoint.x + scrollX * object.scrollFactorX, screenPoint.y + scrollY * object.scrollFactorY);
        
        if (PointWithinGameObject(object, tpoint.x, tpoint.y))
        {
            return object;
        }
    }

    return null;
};

module.exports = PointScreenToWorldHitTest;
