use num::integer::{ExtendedGcd, Integer};
use num::traits::One;
use num_bigint::BigInt;

struct ArithmeticSequence {
    start: BigInt,
    step: BigInt,
}

impl ArithmeticSequence {
    fn intersection(&self, other: &Self) -> Self {
        let step = self.step.lcm(&other.step);

        let ExtendedGcd { x, y, .. } = self.step.extended_gcd(&other.step);
        let start = (&other.start * &self.step * x) + (&self.start * &other.step * y);
        let start = ((start % &step) + &step) % &step;

        Self { start, step }
    }
}

fn main() {
    // Input

    let timestamp: BigInt = 1001287.into();
    let list = "13,x,x,x,x,x,x,37,x,x,x,x,x,461,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,739,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,23";
    let ids: Vec<(BigInt, BigInt)> = list
        .split(",")
        .enumerate()
        .filter(|(_, s)| s != &"x")
        .map(|(i, s)| (i.into(), s.parse::<BigInt>().unwrap()))
        .collect::<Vec<_>>();

    // Part 1

    let (id, wait) = ids
        .iter()
        .cloned()
        .map(|(_, id)| {
            let cycles = &timestamp / &id;
            let wait: BigInt = ((cycles + BigInt::one()) * &id) - &timestamp;
            (id, wait)
        })
        .min_by_key(|(_, wait)| wait.clone())
        .unwrap();

    println!("Part 1: {}", id * wait);

    // Part 2

    let mut series = ArithmeticSequence {
        start: 0.into(),
        step: 1.into(),
    };

    for (i, id) in &ids {
        let start = -i;
        let step = id.clone();
        series = series.intersection(&ArithmeticSequence { start, step });
    }

    println!("Part 2: {}", series.start);
}
