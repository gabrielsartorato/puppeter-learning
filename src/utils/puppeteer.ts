import puppeteer from 'puppeteer';

interface ParamsDestinty {
  week_day: string | undefined;
  origin: string | undefined;
  destiny: string | undefined;
}

interface ArrayStop {
  stop?: string[];
  line_type?: string;
  line_alternative_name?: string;
}

interface StopReturn {
  array_stops?: ArrayStop[];
}

async function gettingData({
  week_day,
  origin,
  destiny,
}: ParamsDestinty): Promise<StopReturn[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `http://www.tcitransporte.com.br/horarios/?week_day=${week_day}&start_time=&end_time=&origin=${origin}&destiny=${destiny}`,
  );
  const stopsReturn = await page.$$eval('.line', (stops) =>
    stops.map((stop) => {
      const array_stops = <ArrayStop[]>[];
      const stoped = stop.querySelectorAll('.line__stop');
      const line_type = stop.querySelector('.line__name')?.textContent || '';
      const line_alternative_name =
        stop.querySelector('.line__name-alternative')?.textContent || '';

      stoped.forEach((st) => {
        const stopPoint = <ArrayStop>(<HTMLElement>st).innerText;
        array_stops.push(stopPoint);
        return array_stops;
      });

      return { array_stops, line_type, line_alternative_name };
    }),
  );

  await browser.close();

  return stopsReturn;
}

export default gettingData;
