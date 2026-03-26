import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
      variant="filled"
      style={{ width: 100 }}
      popupClassName="lang-dropdown"
      options={[
        { value: 'zh', label: '中文' },
        { value: 'en', label: 'English' },
      ]}
    />
  )
}

export default LanguageSwitcher
