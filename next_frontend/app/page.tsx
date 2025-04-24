import Image from "next/image";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div>
        <Image src="/rain.png" alt="rain icon" height={200} width={200} />
          <p>temperature</p>
          <p>weather eg sunny</p>
        </div>
        <div>
          <p>date</p>
          <p>location</p>
        </div>
        <a href="https://www.flaticon.com/free-icons/rain" title="rain icons">Rain icons created by Freepik - Flaticon</a>
      </div>

      <div className={styles.sub_main}>
        <div className={styles.search_temp}>
          <div className={styles.search}>
            <input type="search" name="location" id="location" className="input-ghost-primary input input-block" placeholder="Search city..."/>
            <button className="btn btn-primary btn-md">Go</button>
          </div>

          <div className={styles.temp}>
            <div className="btn-group btn-group-rounded btn-group-scrollable">
	            <button className="btn btn-warning">℃</button>
	            <button className="btn btn-solid-warning">℉</button>
            </div>
          </div>
        </div>

        <div className={styles.x3day_forecast}>
          <div className={` card ${styles.forecast_card}`}>
	          <p className="">date month</p>
            
          </div>
          <div className={`${styles.forecast_card} card`}>
	          <div className="card-body">Hello World 2 </div>
          </div>
          <div className={`${styles.forecast_card} card`}>
	          <div className="card-body">Hello World 3 </div>
          </div>
        </div>

        <div className={styles.wind_humidity}>
          <div className={`${styles.wind_humidity_cards} card`}>
	          <div className="card-body">
              <h2 className="card-header">WIND</h2>
            </div>
            <Image src="/wind.svg" alt="wind icon" height={100} width={100} />
            <div className="card-footer">
			        <p className="">wind direction</p>
		        </div>
          </div>

          <div className={`${styles.wind_humidity_cards} card`}>
	          <div className="card-body">
              <h2 className="card-header">HUMIDITY</h2>
            </div>
            <p>80%</p>
            <progress className="progress progress-warning" value="80" max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  );
}
