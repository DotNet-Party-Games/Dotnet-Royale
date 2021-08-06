    const DownArrKey = 40;
    const UpArrKey = 38;
    const RightArrKey = 39;
    const LeftArrKey = 37;

    const WKey = 87;
    const AKey = 65;
    const SKey = 83;
    const DKey = 68;

    const SpaceKey = 32;

    function UpKeyPressed(keyCode: number)
    {
        return keyCode == WKey || keyCode == UpArrKey;
    }
    function RightKeyPressed(keyCode: number)
    {
        return keyCode == DKey || keyCode == RightArrKey;
    }
    function DownKeyPressed(keyCode: number)
    {
        return keyCode == SKey || keyCode == DownArrKey;
    }
    function LeftKeyPressed(keyCode: number)
    {
        return keyCode == AKey || keyCode == LeftArrKey;
    }
    function SpaceKeyPressed(keyCode: number)
    {
        return keyCode == SpaceKey;
    }
    export enum InputKey
    {
        None = -1,
        Up = 0,
        Right = 1,
        Down = 2,
        Left = 3,
        Space = 4,
    }
    export function getInputKey(keyCode:number) : InputKey {
        let result = InputKey.None;
        if (UpKeyPressed(keyCode)){
            result = InputKey.Up;
        } else if (RightKeyPressed(keyCode)){
            result = InputKey.Right;
        } else if (DownKeyPressed(keyCode)){
            result = InputKey.Down;
        } else if (LeftKeyPressed(keyCode)){
            result = InputKey.Left;
        } else if (SpaceKeyPressed(keyCode)){
            result = InputKey.Space;
        }
        return result;
    }