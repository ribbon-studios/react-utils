{ pkgs ? import <nixpkgs-unstable> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    gnumake
    nodejs_20
    bun
  ];
}
