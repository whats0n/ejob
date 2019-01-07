import { Scene, Controller } from 'scrollmagic'

const details = document.querySelector('.js-details')
const detailsChart = details.querySelector('.js-details-chart')
// Themes begin
am4core.useTheme(am4themes_animated)
// Themes end

// Create chart instance
const chart = am4core.create(detailsChart, am4charts.PieChart)
let created = false
const createChart = () => {
  created = true
  // Add data
  chart.data = [
    { percent: 15 },
    { percent: 25 },
    { percent: 30 },
    { percent: 30 }
  ]

  // Add and configure Series
  const pieSeries = chart.series.push(new am4charts.PieSeries())
  pieSeries.dataFields.value = "percent"
  pieSeries.labels.template.disabled = true
  pieSeries.ticks.template.disabled = true
  pieSeries.slices.template.tooltipText = ""
  pieSeries.colors.list = [
    am4core.color('#00599f'),
    am4core.color('#0064b9'),
    am4core.color('#0070d0'),
    am4core.color('#007ce7')
  ]

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1
  pieSeries.hiddenState.properties.endAngle = -90
  pieSeries.hiddenState.properties.startAngle = -90  
}

const controller = new Controller()
const scene = new Scene({
  triggerHook: 'onCenter',
  triggerElement: details
})

scene
  .addTo(controller)
  .on('enter', () => {
    if (created) return
    createChart()
    setTimeout(() => {
      details.classList.add('is-active')
    }, 500)
  })