import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { GraphComponent } from './graph/graph.component';
import { DigitsComponent } from './digits/digits.component';
import { SunburstComponent } from './sunburst/sunburst.component';
import { RadarComponent } from './radar/radar.component';
import { SkillsComponent } from './skills/skills.component';
import { DiagramComponent } from './diagram/diagram.component';
import { TreeComponent } from './tree/tree.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BubblesComponent,
    GraphComponent,
    DigitsComponent,
    SunburstComponent,
    RadarComponent,
    SkillsComponent,
    DiagramComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
