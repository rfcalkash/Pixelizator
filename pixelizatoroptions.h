#ifndef PIXELIZATOROPTIONS_H
#define PIXELIZATOROPTIONS_H

#include <QObject>
#include <QString>
#include <QUrl>
#include <QVariantList>

class PixelizatorOptions : public QObject {
    Q_OBJECT
public:
    enum PaletteType { VGA,
        EGA,
        CGA };
    Q_ENUM(PaletteType)

    Q_PROPERTY(PaletteType palette READ palette WRITE setPalette NOTIFY paletteChanged)
    Q_PROPERTY(int pixelSize READ pixelSize WRITE setPixelSize NOTIFY pixelSizeChanged)
    Q_PROPERTY(bool ditheringEnabled READ ditheringEnabled WRITE setDitheringEnabled NOTIFY ditheringEnabledChanged)
    Q_PROPERTY(double ditheringThreshold READ ditheringThreshold WRITE setDitheringThreshold NOTIFY ditheringThresholdChanged)

public:
    explicit PixelizatorOptions(QObject* parent = nullptr);

    PaletteType palette() const;
    void setPalette(const PaletteType& palette);

    int pixelSize() const;
    void setPixelSize(int pixelSize);

    bool ditheringEnabled() const;
    void setDitheringEnabled(bool ditheringEnabled);

    double ditheringThreshold() const;
    void setDitheringThreshold(double ditheringThreshold);

    Q_INVOKABLE void saveOptions(const QUrl& filePath);
    Q_INVOKABLE void loadOptions(const QUrl& filePath);
    Q_INVOKABLE QVariantList getPaletteNames();
signals:
    void paletteChanged();
    void pixelSizeChanged();
    void ditheringEnabledChanged();
    void ditheringThresholdChanged();

private:
    PaletteType m_palette;
    int m_pixelSize;
    bool m_ditheringEnabled;
    double m_ditheringThreshold;
};

#endif // PIXELIZATOROPTIONS_H
