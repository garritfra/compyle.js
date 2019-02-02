use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut file = read_file();
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer);
    print!("{:?}", buffer);

    let mut output = match File::create("output.js") {
        Ok(file) => file,
        Err(e) => panic!(e),
    };

    output.write_all(b"Hello World!!!");
}

fn read_file() -> File {
    let input = std::env::args().nth(1);
    let file_name = match input {
        Some(name) => name,
        None => panic!("No arguments were specified"),
    };

    match File::open(file_name) {
        Ok(file) => file,
        Err(e) => panic!("{}", e),
    }
}
