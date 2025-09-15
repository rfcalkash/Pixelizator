#include "pixelizatoroptions.h"

#include <QDebug>
#include <QMetaEnum>
#include <QSettings>

PixelizatorOptions::PixelizatorOptions(QObject* parent)
    : QObject(parent)
    , m_palette(VGA)
    , m_pixelSize(1)
    , m_ditheringEnabled(false)
    , m_ditheringThreshold(0.5)
{
}

PixelizatorOptions::PaletteType PixelizatorOptions::palette() const
{
    return m_palette;
}

void PixelizatorOptions::setPalette(const PixelizatorOptions::PaletteType& palette)
{
    if (m_palette == palette)
        return;

    m_palette = palette;
    emit paletteChanged();
}

int PixelizatorOptions::pixelSize() const
{
    return m_pixelSize;
}

void PixelizatorOptions::setPixelSize(int pixelSize)
{
    if (m_pixelSize == pixelSize)
        return;

    m_pixelSize = pixelSize;
    emit pixelSizeChanged();
}

bool PixelizatorOptions::ditheringEnabled() const
{
    return m_ditheringEnabled;
}

void PixelizatorOptions::setDitheringEnabled(bool ditheringEnabled)
{
    if (m_ditheringEnabled == ditheringEnabled)
        return;

    m_ditheringEnabled = ditheringEnabled;
    emit ditheringEnabledChanged();
}

double PixelizatorOptions::ditheringThreshold() const
{
    return m_ditheringThreshold;
}

void PixelizatorOptions::setDitheringThreshold(double ditheringThreshold)
{
    if (m_ditheringThreshold == ditheringThreshold)
        return;

    m_ditheringThreshold = ditheringThreshold;
    emit ditheringThresholdChanged();
}

void PixelizatorOptions::saveOptions(const QUrl& filePath)
{
    QSettings settings(filePath.toLocalFile(), QSettings::IniFormat);
    settings.setValue("palette", static_cast<int>(m_palette));
    settings.setValue("pixelSize", m_pixelSize);
    settings.setValue("ditheringEnabled", m_ditheringEnabled);
    settings.setValue("ditheringThreshold", m_ditheringThreshold);
    qDebug() << "Options saved to" << filePath;
}

void PixelizatorOptions::loadOptions(const QUrl& filePath)
{
    QSettings settings(filePath.toLocalFile(), QSettings::IniFormat);
    setPalette(static_cast<PaletteType>(settings.value("palette", VGA).toInt()));
    setPixelSize(settings.value("pixelSize", 1).toInt());
    setDitheringEnabled(settings.value("ditheringEnabled", false).toBool());
    setDitheringThreshold(settings.value("ditheringThreshold", 0.5).toDouble());
    qDebug() << "Options loaded from" << filePath;
}

QVariantList PixelizatorOptions::getPaletteNames()
{
    QVariantList names;
    QMetaEnum metaEnum = QMetaEnum::fromType<PaletteType>();
    for (int i = 0; i < metaEnum.keyCount(); ++i) {
        names.append(QString(metaEnum.key(i)));
    }
    return names;
}
