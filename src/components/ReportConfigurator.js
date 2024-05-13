export default {
    name: 'ReportConfigurator',
  
    props: {
      url: {
        type: String,
        required: true
      },
      filters: {
        type: Object,
        required: true
      },
      show: {
        type: String,
        default: null
      }
    },
  
    setup(props) {
      const reportConfig = generateReportConfig(props.url, props.filters, props.show);
  
      return {
        reportConfig
      };
    }
  };
  
  function generateReportConfig(url, filters, show) {
    // Создание конфигурации отчета
    return {
      url: url,
      show: show,
      filters: filters
    };
  }