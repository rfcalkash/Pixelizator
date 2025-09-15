cmake_minimum_required(VERSION 3.16)

project(Pixelizator VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Quick OpenGL)

qt_standard_project_setup(REQUIRES 6.8)

qt_add_executable(appPixelizator
    main.cpp



)

qt_add_qml_module(appPixelizator
    URI Pixelizator
    VERSION 1.0
        SOURCES pixelizatoroptions.cpp pixelizatoroptions.h
        RESOURCES res.qrc
)

# Qt for iOS sets MACOSX_BUNDLE_GUI_IDENTIFIER automatically since Qt 6.1.
# If you are developing for iOS or macOS you should consider setting an
# explicit, fixed bundle identifier manually though.
set_target_properties(appPixelizator PROPERTIES
#    MACOSX_BUNDLE_GUI_IDENTIFIER com.example.appPixelizator
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
)

target_link_libraries(appPixelizator
    PRIVATE Qt6::Quick Qt6::OpenGL
)

include(GNUInstallDirs)
install(TARGETS appPixelizator
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
