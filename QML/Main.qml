import QtQuick.Controls.Material as MD
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import QtQuick.Window
import QtQuick.Dialogs
import QtQuick3D



Window {
    width: 640
    height: 900
    visible: true
    title: qsTr("Hello World")

    FileDialog {
        id: fileDialog
        title: qsTr("Select Options File")
        nameFilters: [qsTr("INI files (*.ini)"), qsTr("All files (*)")]
        selectedNameFilter.index: 0
        onAccepted: {
            if (fileDialog.fileMode === FileDialog.OpenFile) {
                pixelizatorOptions.loadOptions(fileDialog.selectedFile)
            } else if (fileDialog.fileMode === FileDialog.SaveFile) {
                pixelizatorOptions.saveOptions(fileDialog.selectedFile)
            }
        }
    }

    ColumnLayout {
        anchors.fill: parent

        MenuBar {
            Layout.fillWidth: true
            Menu {
                title: qsTr("File")
                MenuItem {
                    text: qsTr("Load Options...")
                    onTriggered: {
                        fileDialog.fileMode = FileDialog.OpenFile
                        fileDialog.title = qsTr("Load Options File")
                        fileDialog.open()
                    }
                }
                MenuItem {
                    text: qsTr("Save Options...")
                    onTriggered: {
                        fileDialog.fileMode = FileDialog.SaveFile
                        fileDialog.title = qsTr("Save Options File")
                        fileDialog.open()
                    }
                }
                MenuSeparator { }
                MenuItem {
                    text: qsTr("Load 3D Object...")
                    onTriggered: {
                        console.log("Load 3D Object triggered")
                    }
                }
            }
        }

        Item{
            Layout.fillHeight: true
            Layout.fillWidth: true
            View3D {
                id: view
                property int speed: 3000
                anchors.fill: parent
                // visible: false
                //! [environment]
                environment: SceneEnvironment {
                    clearColor: "skyblue"
                    backgroundMode: SceneEnvironment.Color
                    effects: Effect{
                        property int pSize: pixelizatorOptions.pixelSize
                        property double edgeAmount: 0.1
                        property int pDepth: {
                            switch(paletteComboBox.currentIndex){
                            case 0: return 8
                            case 1: return 4
                            case 2: return 2
                            }
                        }
                        passes: [
                            Pass{
                                shaders: [
                                    Shader{
                                        shader: "qrc:/shaders/shaders/base.frag"
                                        stage: Shader.Fragment
                                    }

                                ]
                            }
                            // ,
                            // Pass{
                            //     shaders: [
                            //         Shader{
                            //             shader: "qrc:/shaders/shaders/depth.frag"
                            //             stage: Shader.Fragment
                            //         }

                            //     ]
                            // }

                        ]
                    }
                }
                //! [environment]

                //! [camera]
                OrthographicCamera {
                    position: Qt.vector3d(0, 200, 300)
                    eulerRotation.x: -30
                }
                //! [camera]

                //! [light]
                DirectionalLight {
                    eulerRotation.x: -30
                    eulerRotation.y: -70
                    ambientColor: "grey"
                }
                //! [light]

                //! [objects]
                Model {
                    position: Qt.vector3d(0, -200, 0)
                    source: "#Cylinder"
                    scale: Qt.vector3d(2, 0.2, 1)
                    materials: [ PrincipledMaterial {
                            baseColor: "red"
                        }
                    ]
                }

                Model {
                    position: Qt.vector3d(0, 150, 0)
                    source: "#Sphere"

                    materials: [ PrincipledMaterial {
                            baseColor: "cyan"
                        }
                    ]

                    //! [animation]
                    SequentialAnimation on y {
                        loops: Animation.Infinite
                        NumberAnimation {
                            duration: view.speed
                            to: -150
                            from: 150
                            easing.type:Easing.InQuad
                        }
                        NumberAnimation {
                            duration: view.speed
                            to: 150
                            from: -150
                            easing.type:Easing.OutQuad
                        }
                    }
                    //! [animation]
                }
                //! [objects]
            }

        }
        ColumnLayout {
            Layout.fillWidth: true
            Layout.margins: MD.Material.frameVerticalPadding

            Text {
                text: "Controls"
                font.bold: true
            }

            ComboBox {
                id: paletteComboBox
                Layout.fillWidth: true
                model: pixelizatorOptions.getPaletteNames()
                Connections{
                    function onActivated(index){
                        pixelizatorOptions.palette = index
                    }
                }
                currentIndex: pixelizatorOptions.palette
            }

            Label { text: "Pixel Size "+ pixelizatorOptions.pixelSize}
            Slider {
                id: pixelSizeSlider
                Layout.fillWidth: true
                from: 1
                to: 10
                value: pixelizatorOptions.pixelSize
                onMoved: {
                    pixelizatorOptions.pixelSize = value
                }
            }

            CheckBox {
                id: ditheringCheckBox
                text: "Dithering"
                checked: pixelizatorOptions.ditheringEnabled
                onToggled: {
                    pixelizatorOptions.ditheringEnabled = checked
                }
            }

            Label { text: "Dithering Threshold" }
            Slider {
                id: ditheringThresholdSlider
                Layout.fillWidth: true
                from: 0
                to: 1
                value: pixelizatorOptions.ditheringThreshold
                stepSize: 0.01
                enabled: ditheringCheckBox.checked
                onMoved: {
                    pixelizatorOptions.ditheringThreshold = value
                }
            }
        }
    }
}
