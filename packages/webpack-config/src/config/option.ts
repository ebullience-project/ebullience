import path from 'path';

export interface LibraryImport {
  libraryName: string;
  libraryDirectory: string;
  style: true | 'css';
}

export interface Theme {
  [propName: string]: string | number;
}

export interface ThirdLib {
  [propName: string]: string;
}

export interface Option {
  isBuild: boolean;
  inputFile: string;
  outputName: string;
  rootDir: string;
  srcDir: string;
  staticDir: string;
  outputDir: string;
  showDetailProgress: boolean;
  host: string;
  port: string;
  layout: string;
  theme: Theme;
  libOnDemand: Partial<LibraryImport>[];
  supportIE: boolean;
  libraryName: string;
  style: boolean;
  thirdLib: ThirdLib;
}

const defaultOption: Option = {
  isBuild: false,
  inputFile: '',
  outputName: '',
  rootDir: process.cwd(),
  srcDir: 'src',
  staticDir: 'static',
  outputDir: 'dist',
  showDetailProgress: false,
  host: '0.0.0.0',
  port: '8888',
  layout: '',
  theme: {},
  libOnDemand: [],
  supportIE: false,
  libraryName: '',
  style: true,
  thirdLib: {}
};

function setOption(option: Partial<Option>) {
  const totalOption = {
    ...defaultOption,
    ...option
  };
  if (!totalOption.outputName)
    totalOption.outputName =
      totalOption.isBuild && totalOption.layout
        ? '[name].[contenthash]'
        : '[name]';
  type contentDir = 'srcDir' | 'staticDir' | 'outputDir';
  const content: contentDir[] = ['srcDir', 'staticDir', 'outputDir'];
  content.forEach((key) => {
    totalOption[key] = path.resolve(totalOption.rootDir, totalOption[key]);
  });
  if (!totalOption.inputFile) {
    totalOption.inputFile = totalOption.layout ? 'index.tsx' : 'index.ts';
  }
  if (!totalOption.layout) {
    totalOption.thirdLib = {
      ...totalOption.thirdLib,
      react: 'React',
      'react-dom': 'ReactDOM'
    };
  }
  return totalOption;
}

export default setOption;
