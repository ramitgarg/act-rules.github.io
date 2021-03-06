---
id: 1ec09b
name: video with audio has audio description
rule_type: composite
description: |
  This rule checks video elements with audio have audio description
accessibility_requirements:
  wcag20:1.2.5: # Audio Description (Prerecorded) (AA)
    forConformance: true
    failed: not satisfied
    passed: further testing needed
    inapplicable: further testing needed
input_rules:
  - 1ea59c
  - ab4d13
  - f196ce
authors:
  - Wilco Fiers
  - Brian Bors
---

## Applicability

The rule applies to every [non-streaming](#non-streaming) `video` element that is [visible](#visible), where the video contains audio.

## Expectation

For each test target, the outcome of at least one of the following rules is passed:

- [Video element audio described](https://auto-wcag.github.io/auto-wcag/rules/SC1-2-video-audio-description.html)
- [Video element description track](https://auto-wcag.github.io/auto-wcag/rules/SC1-2-Video-description-track.html)
- [Video as a media alternative for text](https://auto-wcag.github.io/auto-wcag/rules/SC1-2-video-media-alternative.html)

## Assumptions

This rule assumes that a mechanism is available to start the video and that the video element is not simply used to display the [poster](https://www.w3.org/TR/html5/semantics-embedded-content.html#element-attrdef-video-poster).

## Accessibility Support

See [Video element description track: accessibility support](https://auto-wcag.github.io/auto-wcag/rules/SC1-2-Video-description-track.html#accessibility-support).
See [Video with audio has audio description: accessibility support](https://auto-wcag.github.io/auto-wcag/rules/SC1-2-video-audio-description.html#accessibility-support).

## Background

- [Understanding Success Criterion 1.2.5: Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded.html)
- [G78: Providing a second, user-selectable, audio track that includes audio descriptions](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G78)
- [H96: Using the track element to provide audio descriptions](https://www.w3.org/WAI/GL/2016/WD-WCAG20-TECHS-20160105/H96)
- [G173: Providing a version of a movie with audio descriptions](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G173)
- [G8: Providing a movie with extended audio descriptions](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G8)

## Test Cases

### Passed

#### Pass Example 1

A video element with a voiceover that describes the visual information.

```html
<video controls>
	<source
		src="../test-assets/rabbit-video/video-with-voiceover.mp4"
		type="video/mp4"
	/>
	<source
		src="../test-assets/rabbit-video/video-with-voiceover.webm"
		type="video/webm"
	/>
</video>
```

#### Pass Example 2

A video element with a track element that contains descriptions.

```html
<video controls>
	<source src="../test-assets/rabbit-video/video.mp4" type="video/mp4" />
	<source src="../test-assets/rabbit-video/video.webm" type="video/webm" />
	<track
		kind="descriptions"
		src="../test-assets/rabbit-video/descriptions.vtt"
	/>
</video>
```

#### Pass Example 3

A video element that describes some of the text on the same page. The text on the page labels the video as an alternative.

```html
<p>
	Not being able to use your computer because your mouse doesn't work, is
	frustrating. Many people use only the keyboard to navigate websites. Either
	through preference or circumstance. This is solved by keyboard compatibility.
	Keyboard compatibility is described in WCAG. See the video below to watch the
	same information again in video form.
</p>
<video
	src="../test-assets/perspective-video/perspective-keyboard-compatibility-video.mp4"
	controls
></video>
```

### Failed

#### Fail Example 1

A video element with an incorrect audio description.

```html
<video controls>
	<source
		src="../test-assets/rabbit-video/video-with-incorrect-voiceover.mp4"
		type="video/mp4"
	/>
	<source
		src="../test-assets/rabbit-video/video-with-incorrect-voiceover.webm"
		type="video/webm"
	/>
</video>
```

#### Fail Example 2

A video element with a track element that contains incorrect descriptions.

```html
<video controls>
	<source src="../test-assets/rabbit-video/video.mp4" type="video/mp4" />
	<source src="../test-assets/rabbit-video/video.webm" type="video/webm" />
	<track
		kind="descriptions"
		src="../test-assets/rabbit-video/incorrect-descriptions.vtt"
	/>
</video>
```

#### Fail Example 3

A video element with a link to a text transcript.

```html
<video controls>
  <source src="../test-assets/rabbit-video/video.mp4" type="video/mp4" />
  <source src="../test-assets/rabbit-video/video.webm" type="video/webm"/>
</video>
<a href="../test-assets/rabbit-video/transcript.html">Transcript</p>
```

### Inapplicable

#### Inapplicable Example 1

A video element without audio.

```html
<video controls>
	<source src="../test-assets/rabbit-video/silent.mp4" type="video/mp4" />
	<source src="../test-assets/rabbit-video/silent.webm" type="video/webm" />
</video>
```

#### Inapplicable Example 2

A video element that is not visible on the page.

```html
<video controls style="display: none;">
	<source src="../test-assets/rabbit-video/video.mp4" type="video/mp4" />
	<source src="../test-assets/rabbit-video/video.webm" type="video/webm" />
</video>
```
