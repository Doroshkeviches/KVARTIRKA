export type OneAsteroid = {
    absolute_magnitude_h: number,
    close_approach_data: Array<Close>,
    designation: string,
    estimated_diameter: EstimatedDiameter,
    id: string,
    is_potentially_hazardous_asteroid: boolean,
    is_sentry_object: boolean,
    links: object,
    name: string,
    nasa_jpl_url: string,
    neo_reference_id: string,
    orbital_data: object
}
export type Close = {
    close_approach_date: string,
    close_approach_date_full: string,
    epoch_date_close_approach: number,
    miss_distance: MissDistance,
    orbiting_body: string,
    relative_velocity: RelativeVelocity
}
type EstimatedDiameter = {
    meters: {
        estimated_diameter_min: number
    }
}
type RelativeVelocity = {
    kilometers_per_hour: string,
    kilometers_per_second: string,
    miles_per_hour: string

}
type MissDistance = {
    astronomical: string,
    kilometers: string,
    lunar: string,
    miles: string,

}
export type Context = {
    items: Array<OneAsteroid> | [],
    updateItems: (newItems: OneAsteroid) => void,
    spacing: string,
    updateSpacing: (str: string) => void

}