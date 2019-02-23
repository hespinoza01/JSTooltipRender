'use strict';

const TooltipRender = ()=>{
  let elements = Array.from(document.querySelectorAll('[tooltip]')),
      tooltipStyles = document.createElement('style'),
      head = document.head;

  tooltipStyles.id = "tooltipStyles";
  if(elements.length > 0 && !head.querySelector('#tooltipStyles')){
    head.appendChild(tooltipStyles);

    tooltipStyles.innerHTML = `
      .tooltip {
        position: absolute;
        background-color: #646464;
        border-radius:4px;
        padding: 6px 12px;
        font-size: 12px;
        text-shadow: 0 1px 1px #000;
        color: #fff;
      }
      .tooltip:before {
        content : " ";
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #646464;
        position:absolute;
        bottom:-5px;
        left:5px;
      }
    `;
  }

  for(let element of elements){
    element.addEventListener('mouseover', e => {
      let target = e.target,
          tooltip = document.createElement('div'),
          targetPoints = target.getBoundingClientRect(),
          bodyPoints = document.body.getBoundingClientRect();

      document.body.appendChild(tooltip);

      tooltip.textContent = target.getAttribute("tooltip");
      tooltip.className = "tooltip";
      tooltip.setAttribute('style', `top: ${targetPoints.top - bodyPoints.top - targetPoints.height}px; left: ${e.pageX - 10}px;`);
    });

    element.addEventListener('mousemove', e => {
      document.querySelector('.tooltip').style.left = `${e.pageX - 10}px`;
    });

    element.addEventListener('mouseout', e => {
      document.querySelector('.tooltip').remove();
    });
  }
};
TooltipRender();
