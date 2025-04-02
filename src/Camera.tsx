import { Element3D, PerspectiveCamera, XYZNumberValues } from "lume";
import { Portal } from "solid-js/web";
import {createSignal, createEffect} from "solid-js"

enum CameraMode {
    SPIN1 = "Spin Body",
    SPIN2 = "Spin Both",
    STATIONARY = "Both stationary",
    FORCE_STATIONARY = "Force Stationary (Function Override)"
}

export default function Camera() {
    let bodyRef!: Element3D;
    let camRef!: PerspectiveCamera;

    const [camMode, setCamMode] = createSignal<CameraMode>(CameraMode.STATIONARY);

    createEffect(() => {
        switch(camMode()) {
            case CameraMode.SPIN1:
                bodyRef.rotation = (x,y,z) => [x, y - 1, z];
                camRef.rotation = "0 0 0";
                break;
            case CameraMode.SPIN2:
                bodyRef.rotation = (x,y,z) => [x, y - 0.5, z];
                camRef.rotation = (x,y,z) => [x + 1, y, z];
                break;
            case CameraMode.STATIONARY:
                // Expected Behavior - This should disable the functions attached by SPIN1/SPIN2 cases.
                // Actual Behavior - Rotation breifly resets to these values and functions continue to run.
                bodyRef.rotation = new XYZNumberValues(0, 0, 0);
                camRef.rotation = new XYZNumberValues(0, 0, 0);
                break;
            case CameraMode.FORCE_STATIONARY:
                // Very rough "fix"
                bodyRef.rotation = (x,y,z) => [x,y,z];
                camRef.rotation = (x,y,z) => [x,y,z];
                bodyRef.rotation = new XYZNumberValues(0, 0, 0);
                camRef.rotation = new XYZNumberValues(0, 0, 0);

            // Additional Notes: 
            /*
            I also tried setting body/camera rotation to "null" first, 
            but that seemed to bug out some of my billboard component (which gets the cameras rotation/transform matrix)

            This demo seems to more reliably catch the bug, for some reason the implementation in my game
            only has this issue with the perspective-camera, while the body's element3d properly disposes the function on change.
            */
        }
    })

    return (
        <>
            <lume-element3d ref={bodyRef} align-point="0.5 0.5" position="0 0 0">
                <lume-perspective-camera ref={camRef} active/>
            </lume-element3d>

            <Portal mount={document.body}>
                <button onClick={() => setCamMode(CameraMode.SPIN1)}>{CameraMode.SPIN1}</button>
                <button onClick={() => setCamMode(CameraMode.SPIN2)}>{CameraMode.SPIN2}</button>
                <button onClick={() => setCamMode(CameraMode.STATIONARY)}>{CameraMode.STATIONARY}</button>
                <button onClick={() => setCamMode(CameraMode.FORCE_STATIONARY)}>{CameraMode.FORCE_STATIONARY}</button>
                <br/>
                Currently: {camMode()}
            </Portal>
        </>
    )
}